import logo from '../../../assets/images/go-l.png'

/** Left branding panel — UI only */
const RegisterBrandPanel = () => {
  return (
    <aside className="relative hidden h-full w-full flex-col items-center justify-center gap-6 overflow-hidden bg-linear-to-br from-app-primary-900 via-app-primary-800 to-app-primary-500 px-8 py-12 text-app-text-inverse tablet:flex tablet:w-1/2">
      <div className="relative z-10 flex w-full max-w-sm flex-col items-center gap-6 text-center">
        <p className="text-2xl font-bold text-app-text-inverse">Go Manage</p>

        <div className="flex w-full items-center justify-center rounded-2xl bg-app-surface p-6">
          <img
            src={logo}
            alt="Go Manage"
            className="h-auto w-full max-w-[14rem] object-contain"
          />
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold text-app-text-inverse">
            Create your workspace
          </h2>
          <p className="text-sm text-app-primary-100">
            Register as Super Admin and set up your organization in minutes
          </p>
        </div>
      </div>
    </aside>
  )
}

export default RegisterBrandPanel
