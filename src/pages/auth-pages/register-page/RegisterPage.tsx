import RegisterBrandPanel from './RegisterBrandPanel'
import RegisterForm from './RegisterForm'

const RegisterPage = () => {
  return (
    <div className="flex min-h-dvh w-full items-stretch justify-center bg-app-bg p-4 tablet:p-6 desktop:p-8">
      <div className="flex max-h-[min(56rem,100%)] min-h-[36rem] w-full max-w-6xl overflow-hidden rounded-2xl border border-app-border bg-app-surface shadow-sm">
        <RegisterBrandPanel />

        <section className="flex w-full flex-col items-center justify-center overflow-y-auto px-6 py-8 mobile:px-8 tablet:w-1/2 tablet:px-10 desktop:px-14">
          <RegisterForm />
        </section>
      </div>
    </div>
  )
}

export default RegisterPage
