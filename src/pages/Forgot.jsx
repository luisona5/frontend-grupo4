import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import useFetch from '../hooks/useFetch'; // Assuming your custom hook is here
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Don't forget to import the CSS for react-toastify
import { useState } from 'react'; // Import useState for the loading state

export const Forgot = () => {
    // Initialize react-hook-form
    const { register, handleSubmit, formState: { errors } } = useForm();
    // Use your custom fetch hook for backend communication
    const { fetchDataBackend } = useFetch();
    // State to manage the loading status of the "Enviar correo" button
    const [isLoading, setIsLoading] = useState(false);

    // Function to handle form submission (sending the password reset email)
    const sendMail = async (data) => {
        // Construct the backend URL using environment variable
        const url = `${import.meta.env.VITE_BACKEND_URL}/recuperarpassword`;

        setIsLoading(true); // Set loading to true when the request starts

        try {
            // Call the backend to send the password reset email
            await fetchDataBackend(url, data, 'POST');
            // Show a success toast notification
            toast.success("Correo enviado correctamente. Por favor, revisa tu bandeja de entrada ");
        } catch (error) {
            // Show an error toast notification
            // It tries to get a specific message from the backend error response,
            // otherwise, it provides a generic error message.
            toast.error(error.response?.data?.msg || "Error al enviar el correo. Por favor, verifica el correo o inténtalo más tarde.");
        } finally {
            setIsLoading(false); // Set loading to false when the request finishes (success or failure)
        }
    }

    return (
        <div className="flex flex-col sm:flex-row h-screen">
            {/* ToastContainer is required for react-toastify to display notifications */}
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

            {/* Left section: Forgot Password Form */}
            <div className="w-full sm:w-1/2 h-screen bg-white flex justify-center items-center">
                <div className="md:w-4/5 sm:w-full p-4 sm:p-0"> {/* Added padding for smaller screens */}

                    <h1 className="text-3xl font-semibold mb-6 text-center uppercase text-gray-700">¡Olvidaste tu contraseña!</h1>

                    <form onSubmit={handleSubmit(sendMail)}>

                        {/* Email Input Field */}
                        <div className="mb-4"> {/* Increased margin-bottom for better spacing */}
                            <label htmlFor="email" className="mb-2 block text-sm font-semibold text-gray-600">Correo electrónico</label>
                            <input
                                id="email" // Added id for better accessibility with label
                                type="email"
                                placeholder="Ingresa un correo electrónico válido"
                                className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-2 px-3 text-gray-700" // Increased padding
                                {...register("email", {
                                    required: "El correo es obligatorio",
                                    pattern: {
                                        // Basic regex for email validation
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Formato de correo electrónico inválido"
                                    }
                                })}
                            />
                            {/* Display validation errors */}
                            {errors.email && <p className='text-red-600 text-sm mt-1'>{errors.email.message}</p>} {/* Adjusted text color and size for error */}
                        </div>

                        {/* Submit Button */}
                        <div className="mb-6"> {/* Increased margin-bottom */}
                            <button
                                type="submit" // Explicitly set type to submit for forms
                                className="bg-gray-700 text-white border py-2 w-full rounded-xl mt-5 hover:scale-105 duration-300 hover:bg-gray-900 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed" // Added disabled styles
                                disabled={isLoading} // Disable button when isLoading is true
                            >
                                {isLoading ? "Enviando..." : "Enviar correo"} {/* Change button text based on loading state */}
                            </button>
                        </div>

                    </form>

                    {/* Divider line */}
                    <div className="mt-5 text-xs border-b-2 py-4 border-gray-200"> {/* Added border color */}
                    </div>

                    {/* Link to Login Page */}
                    <div className="mt-3 text-sm flex flex-col sm:flex-row justify-between items-center text-gray-700"> {/* Adjusted flex for smaller screens */}
                        <p className="mb-3 sm:mb-0">¿Ya posees una cuenta?</p>
                        <Link
                            to="/login"
                            className="py-2 px-5 bg-gray-600 text-slate-300 border rounded-xl hover:scale-110 duration-300 hover:bg-gray-900 hover:text-white text-center" // Added text-center for small screens
                        >
                            Iniciar sesión
                        </Link>
                    </div>

                </div>
            </div>

            {/* Right section: Image (hidden on small screens) */}
            <div className="w-full sm:w-1/2 h-1/3 sm:h-screen bg-[url('/public/images/futbol.jpg')]
            bg-no-repeat bg-cover bg-center sm:block hidden">
                {/* Ensure the image path '/public/images/futbol.jpg' is correct relative to your public folder */}
            </div>
        </div>
    );
}
