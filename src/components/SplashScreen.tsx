import { Component, onMount, onCleanup } from "solid-js";
import { useNavigate } from "@solidjs/router";
import companyLogo from "../assets/company_logo.svg";
import productLogo from "../assets/product_logo.svg";

const SplashScreen: Component = () => {
    const navigate = useNavigate();

    // Duration the splash screen stays visible (in milliseconds)
    const splashDuration = 5000;

    onMount(() => {
        const timerId = setTimeout(() => {
            navigate("/projects", { replace: true });
        }, splashDuration);

        // Cleanup function to clear the timeout if the component unmounts prematurely
        onCleanup(() => {
            clearTimeout(timerId);
        });
    });

    return (
        <div class="fixed inset-0 z-50 bg-gradient-to-br from-fuchsia-100 via-blue-100 to-teal-100">
            <div class="w-full h-full flex flex-col items-center">
                <div class="h-full flex flex-col items-center justify-center">
                    <img
                        src={productLogo}
                        alt="Company Logo"
                        class="w-40 h-40"
                    />
                    <p class="font-ox-bold-bc text-2xl text-[#5e43a3]">
                        Herstellingen
                    </p>
                </div>
                <div class="mb-8 flex flex-col items-center gap-y-1">
                    <img src={companyLogo} alt="cat Logo" class="w-fit h-fit" />
                    <p class="text-black text-xs">© Tiny One</p>
                </div>
            </div>
        </div>
    );
};

export default SplashScreen;
