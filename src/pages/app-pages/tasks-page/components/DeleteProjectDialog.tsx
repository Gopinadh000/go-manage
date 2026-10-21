import Button from '../../../../components/ui/button/Button'

const DeleteProjectDialog = ({
  open,
  projectName,
  onClose,
  onConfirm,
}: {
  open: boolean
  projectName: string
  onClose: () => void
  onConfirm: () => void
}) => {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" role="presentation" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose()
    }}>
      <section role="alertdialog" aria-modal="true" aria-labelledby="delete-project-title" className="w-full max-w-sm rounded-xl border border-app-border bg-app-surface p-5 shadow-xl">
        <h2 id="delete-project-title" className="text-lg font-semibold text-app-text">Delete project?</h2>
        <p className="mt-2 text-sm text-app-text-secondary">This will remove <strong>{projectName}</strong> from this sample view. This action cannot be undone.</p>
        <div className="mt-6 flex justify-end gap-2">
          <Button label="Cancel" variant="outlined" size="sm" onClick={onClose} />
          <Button label="Delete project" size="sm" className="bg-app-error text-white hover:opacity-90" onClick={onConfirm} />
        </div>
      </section>
    </div>
  )
}

export default DeleteProjectDialog
