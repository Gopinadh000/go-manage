import PageHeader from '../../../components/ui/page-header/PageHeader';
import { AddOutlined } from '@mui/icons-material';
import { useState } from 'react';
import Button from '../../../components/ui/button/Button';
import ProjectsDataTable from './components/projects-datatable/ProjectsDataTable';
import CreateProjectModal from './components/create-project/CreateProjectModal';
import useTableRefresh from '../../../components/ui/data-table/hooks/useTableRefresh';
import { usePermission } from '../../../hooks/usePermission';

const ProjectsPage = () => {
  const { can } = usePermission();
  const { refreshKey, refreshTable } = useTableRefresh();
  const [open, setOpen] = useState(false);

  const canCreateProject = can('projects:create');

  return (
    <div className='h-full  border-app-border rounded-md flex flex-col overflow-hidden'>
      <PageHeader
        title='Projects'
        subtitle='6 projects in your workspace'
      >
        {canCreateProject && (
          <Button
            startIcon={<AddOutlined />}
            label='Add Project'
            size='sm'
            onClick={() => setOpen(true)}
          />
        )}
      </PageHeader>
      <div className='flex-1 min-h-0'>
        <ProjectsDataTable
          refreshKey={refreshKey}
          reloadTable={refreshTable}
        />
      </div>
      <CreateProjectModal
        open={open}
        onClose={() => setOpen(false)}
        refreshTable={refreshTable}
      />
    </div>
  );
};

export default ProjectsPage;
