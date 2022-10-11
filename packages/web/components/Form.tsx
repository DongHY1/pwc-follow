import { Formik } from 'formik';
import Link from 'next/link';
import { trpc } from '../api/APIProvider';
import { useAuth } from '../contexts/auth';
import { useErrorNotificationToast } from '../hooks/useErrorNotificationToast';
import MainLayout from '../layouts/MainLayout';
import { FormStatus } from '../utils/enum';
interface FormProps {
  status: FormStatus;
}
const Form = (props: FormProps) => {
  const { status } = props;
  const mutation = trpc.useMutation(
    `${status === FormStatus.LOGIN ? 'auth/login' : 'auth/signup'}`
  );
  const { authenticate } = useAuth();
  useErrorNotificationToast(mutation.error?.message);
  return (
    <MainLayout>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                {`${
                  status === FormStatus.LOGIN ? 'Sign in' : 'Sign Up'
                } to your account`}
              </h1>
              <Formik
                initialValues={
                  status === FormStatus.LOGIN
                    ? { email: '', password: '' }
                    : { name: '', email: '', password: '' }
                }
                onSubmit={async (values) => {
                  const { token } = await mutation.mutateAsync(values);
                  authenticate(token);
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                }) => (
                  <form
                    className="space-y-4 md:space-y-6"
                    onSubmit={handleSubmit}
                  >
                    {status === FormStatus.REGISTER && (
                      <div>
                        <div className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Your nickname
                        </div>
                        <input
                          type="name"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.name}
                          name="name"
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="David"
                        />
                        {touched.name && errors.name}
                      </div>
                    )}
                    <div>
                      <div className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Your email
                      </div>
                      <input
                        type="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        name="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="name@company.com"
                      />
                      {touched.email && errors.email}
                    </div>
                    <div>
                      <div className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Password
                      </div>
                      <input
                        type="password"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                      {touched.password && errors.password}
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full  bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                      {status === FormStatus.LOGIN ? 'Sign In' : 'Sign Up'}
                    </button>
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      {status === FormStatus.LOGIN
                        ? 'Don’t have an account yet?'
                        : 'Already have an account ?'}{' '}
                      <Link
                        href={status === FormStatus.LOGIN ? 'signup' : 'login'}
                        passHref
                      >
                        <button className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                          {status === FormStatus.LOGIN ? 'Sign Up' : 'Sign In'}
                        </button>
                      </Link>
                    </p>
                  </form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Form;
