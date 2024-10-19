import Title from "antd/es/typography/Title";

const ResetPassword = () => {
  const handleSubmit = (e: any) => {
    e.preventDefault();
  };
  return (
    <main className='main-wrapper relative overflow-hidden'>
      <section id='password-reset-section'>
        <div className='py-40 pt-36 xl:pb-[80px] xl:pt-[60px]'>
          <div className='global-container'>
            <div className='mx-auto max-w-[910px] text-center'>
              <Title level={1} className='mb-[60px]'>Reset Password</Title>
              <div className='block rounded-lg bg-white px-[30px] py-[50px] text-left shadow-[0_4px_60px_0_rgba(0,0,0,0.1)] sm:px-10'>
                <form
                  onSubmit={handleSubmit}
                  className='flex flex-col gap-y-5'
                >
                  <div className='grid grid-cols-1 gap-6'>
                    <div className='flex flex-col gap-y-[10px]'>
                      <label
                        htmlFor='password-reset-email'
                        className='text-lg font-bold leading-[1.6]'
                      >
                        Email address
                      </label>
                      <input
                        type='email'
                        name='password-reset-email'
                        id='password-reset-email'
                        placeholder='example@gmail.com'
                        className='rounded-[10px] border border-gray-300 bg-white px-6 py-[18px] font-bold text-black outline-none transition-all placeholder:text-slate-500 focus:border-colorMainPurple'
                      />
                    </div>
                    <div className='flex flex-col gap-y-[10px]'>
                      <label
                        htmlFor='password-reset-password'
                        className='text-lg font-bold leading-[1.6]'
                      >
                        Enter Password
                      </label>
                      <input
                        type='password'
                        name='password-reset-password'
                        id='password-reset-password'
                        placeholder='............'
                        className='rounded-[10px] border border-gray-300 bg-white px-6 py-[18px] font-bold text-black outline-none transition-all placeholder:text-slate-500 focus:border-colorMainPurple'
                      />
                    </div>
                  </div>
                  <button
                    type='submit'
                    className='button mt-7 block rounded-[50px] border-2 border-black bg-black py-4 text-white after:bg-colorMainPurple hover:border-colorMainPurple hover:text-white'
                  >
                    Change password
                  </button>
                </form>
                <p className='mt-6 text-center text-base'>
                  If you didn’t request a password recovery link, please
                  ignore this.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ResetPassword;
