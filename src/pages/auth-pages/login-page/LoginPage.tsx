import LoginBrandPanel from './LoginBrandPanel'
import LoginForm from './LoginForm'

const LoginPage = () => {
  return (
    <div className="flex min-h-dvh w-full items-stretch justify-center bg-app-bg p-4 tablet:p-6 desktop:p-8">
      <div className="flex h-[min(52rem,100%)] min-h-[36rem] w-full max-w-6xl overflow-hidden rounded-2xl border border-app-border bg-app-surface shadow-sm">
        <LoginBrandPanel />

        <section className="flex w-full flex-col items-center justify-center px-6 py-10 mobile:px-8 tablet:w-1/2 tablet:px-12 desktop:px-16">
          <LoginForm />
        </section>
      </div>
    </div>
  )
}

export default LoginPage
