import appEvents from '../events/appEvents.js';
import { sendEmail } from '../services/email.service.js';

appEvents.on('projectCreated', async (project) => {
  try {
    if (!project.email) return;

    await sendEmail({
      to: project.email,
      subject: 'Project created successfully',
      text: `Your project "${project.name}" has been created.`,
    });

    console.log('Project email sent');
  } catch (error) {
    console.error('Project email failed:', error);
  }
});
