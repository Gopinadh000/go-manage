import { useEffect, useState, type ChangeEvent } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import SaveIcon from '@mui/icons-material/Save'
import APPModal from '../../../../../components/ui/modal/Modal'
import Button from '../../../../../components/ui/button/Button'
import InputField from '../../../../../components/ui/inputs/input-field/InputField'
import SelectField from '../../../../../components/ui/inputs/select-field/SelectField'
import TextArea from '../../../../../components/ui/inputs/text-area/TextArea'
import type { SelectOption } from '../../../../../components/ui/inputs/select-field/select.types'
import { PROJECT_BY_ID_QUERY } from '../../../../../graphql/queries/project.queries'
import { UPDATE_PROJECT_MUTATION } from '../../../../../graphql/mutations/project.mutations'
import { useApi } from '../../../../../services/api'
import { useGraphQL } from '../../../../../services/api/useGrapghQL'

interface UpdateProjectModalProps {
  open: boolean
  projectId: string | null
  onClose: () => void
  refreshTable: () => void
}

interface ProjectDetails {
  id: string
  name: string
  description: string | null
  status: string
  owner: {
    id: string
    firstName: string
    lastName: string
  } | null
}

interface ProjectMembersResponse {
  status: boolean
  statusMessage?: string
  data?: {
    members?: Array<{
      id: string
      label: string
    }>
  }
}

interface ProjectFormState {
  name: string
  description: string
  ownerId: string
  status: string
}

const statusOptions: SelectOption[] = [
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' },
]

const emptyForm: ProjectFormState = {
  name: '',
  description: '',
  ownerId: '',
  status: 'active',
}

const UpdateProjectModal = ({
  open,
  projectId,
  onClose,
  refreshTable,
}: UpdateProjectModalProps) => {
  const { GET } = useApi<ProjectMembersResponse>()
  const { execute, loading } = useGraphQL()
  const [form, setForm] = useState<ProjectFormState>(emptyForm)
  const [owners, setOwners] = useState<SelectOption[]>([])
  const [isFetching, setIsFetching] = useState(false)
  const [error, setError] = useState('')
  const [ownersError, setOwnersError] = useState('')



  useEffect(() => {
    if (!open || !projectId) return

    let cancelled = false
    const loadProjectForm = async () => {
      setIsFetching(true)
      setError('')
      setOwnersError('')

      try {
        try {
          const membersResult = await GET('/projects/members')
          if (!membersResult?.status) {
            throw new Error(membersResult?.statusMessage || 'Could not load project owners.')
          }
          if (cancelled) return

          setOwners((membersResult.data?.members ?? []).map((member) => ({
            label: member.label,
            value: member.id,
          })))
          
        } catch (membersError) {
          if (cancelled) return
          setOwners([])
          setOwnersError(
            membersError instanceof Error
              ? membersError.message
              : 'Could not load project owners.',
          )
        }

        const projectResult = await execute<
          { projectById: ProjectDetails },
          { id: string }
        >(PROJECT_BY_ID_QUERY, { id: projectId })
        if (cancelled) return

        const project = projectResult.projectById
        if (!project) throw new Error('Project details were not returned by the server.')

        setForm({
          name: project.name,
          description: project.description ?? '',
          ownerId: project.owner?.id ?? '',
          status: project.status || 'active',
        })
      } catch (loadError) {
        if (!cancelled) {
          setError(loadError instanceof Error ? loadError.message : 'Could not load project details.')
        }
      } finally {
        if (!cancelled) setIsFetching(false)
      }
    }

    void loadProjectForm()
    return () => {
      cancelled = true
    }
  }, [GET, execute, open, projectId])

  const handleTextChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSave = async () => {
    if (!projectId || !form.name.trim()) {
      setError('Project name is required.')
      return
    }

    setError('')
    try {
      await execute(UPDATE_PROJECT_MUTATION, {
        id: projectId,
        input: {
          name: form.name.trim(),
          description: form.description.trim(),
          ownerId: form.ownerId || null,
          status: form.status,
        },
      })
      refreshTable()
      onClose()
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Could not update project.')
    }
  }

  
  return (
    <APPModal
      open={open}
      onClose={onClose}
      title="Update Project"
      modalType="side"
      size="l"
      footerComponent={
        <div className="flex w-full justify-end gap-2">
          <Button
            size="sm"
            label="Cancel"
            variant="outlined"
            startIcon={<CloseIcon />}
            onClick={onClose}
          />
          <Button
            size="sm"
            label="Save changes"
            startIcon={<SaveIcon />}
            onClick={handleSave}
            disabled={isFetching || loading || !form.name.trim()}
          />
        </div>
      }
    >
      {isFetching ? (
        <p className="py-6 text-center text-sm text-app-text-muted">Loading project details...</p>
      ) : (
        <div className="flex flex-col gap-5">
          {error && (
            <p role="alert" className="rounded-md bg-app-error-soft p-3 text-sm text-app-error">
              {error}
            </p>
          )}
          {ownersError && (
            <p role="alert" className="rounded-md bg-app-error-soft p-3 text-sm text-app-error">
              {ownersError}
            </p>
          )}
          <InputField
            label="Project name"
            name="name"
            type="text"
            placeholder="Enter project name"
            value={form.name}
            required
            onChange={handleTextChange}
          />
          <TextArea
            label="Description"
            name="description"
            placeholder="Enter project description"
            value={form.description}
            rows={5}
            onChange={handleTextChange}
          />
          <SelectField
            label="Project owner"
            name="ownerId"
            placeholder="Select project owner"
            value={form.ownerId}
            options={owners}
            onChange={(event) => setForm((current) => ({
              ...current,
              ownerId: String(event.target.value),
            }))}
          />
          <SelectField
            label="Project status"
            name="status"
            value={form.status}
            options={statusOptions}
            onChange={(event) => setForm((current) => ({
              ...current,
              status: String(event.target.value),
            }))}
          />
        </div>
      )}
    </APPModal>
  )
}

export default UpdateProjectModal
