import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { login } from "../../actions/auth.action";
import ValidationErrors from "../../components/ValidationErrors";
import { getToken, handleError } from "../../helper";

export default function Login() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { errors, inProgress } = useSelector((state) => state.auth)
    const { register, handleSubmit, watch } = useForm();


    const onSubmit = async ({ email, password }) => {
        try {
            await login(email, password)(dispatch);
            navigate('/')
        } catch (e) {
            handleError(e)
        }
    };

    if (getToken()) {
        return <Navigate to='/' replace />
    }

    return (
        <div className="min-h-screen flex flex-col sm:justify-center pt-20 sm:pt-0 items-center bg-white  sm:bg-gray-100">


            <div className="block w-full sm:max-w-md px-6 py-4 bg-white sm:shadow-md overflow-hidden sm:rounded-lg">
                <h1 className="text-2xl text-center mb-4">Member Login</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ValidationErrors errors={errors} />
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="email" autoComplete="username" name="email" className="border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm mt-1 block w-full"   {...register("email")} />
                    </div>
                    <div >
                        <label htmlFor="password">Password</label>
                        <input type="password" autoComplete="new-password" className="border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm mt-1 block w-full"    {...register("password")}
                        />
                    </div>

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            disabled={inProgress}
                            className={`inline-flex mt-4 items-center px-4 py-3 bg-primary border border-transparent rounded font-semibold text-xs text-white uppercase tracking-widest active:bg-cyan-900 transition ease-in-out duration-150 ${inProgress ? "opacity-50 cursor-not-allowed" : ""}`}

                        >
                            {inProgress && <svg role="status" class="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                            </svg>}

                            Login
                        </button>
                    </div>
                </form>
            </div >
        </div >

    );
}