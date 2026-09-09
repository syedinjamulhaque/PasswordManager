import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
const Manager = () => {
    const [form, setForm] = useState({site: "", username : "", password : ""})
    return (
        <main className="relative flex flex-col justify-center items-center font-playpen">
            <div className="mx-auto w-2/3 px-4 py-8 sm:px-6 lg:px-8 bg-white/30 backdrop-blur-md border border-white/40 shadow-lg rounded-2xl mt-6 min-h-[80vh]">
                <div className="flex flex-col items-center">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                        <span className="text-green-500">&lt;</span>
                        <span>Vaultix</span>
                        <span className="text-green-500">/&gt;</span>
                    </h1>
                    <p className="mt-1 text-sm text-gray-600">Your own Password Manager</p>
                    <div className="mt-8 flex w-full flex-col gap-4">
                        <input
                            type="text"
                            placeholder="Enter Website URL"
                            className="w-full rounded-full border border-green-500 bg-white/70 px-4 py-2 text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <div className="flex flex-col gap-4 sm:flex-row">
                            <input
                                type="text"
                                placeholder="Enter Username"
                                className="w-full rounded-full border border-green-500 bg-white/70 px-4 py-2 text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-green-500"
                            />
                            <div className="relative w-full sm:w-1/2">
                                <input
                                    type="password"
                                    placeholder="Enter Password"
                                    className="w-full rounded-full border border-green-500 bg-white/70 px-4 py-2 text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-green-500"
                                />
                                <span><img src="/system-solid-69-eye-morph-cross.svg" alt="ClosedEye" className="absolute right-4 bottom-2" /></span>
                            </div>
                        </div>
                        <div className="mt-2 flex justify-center">
                            <button className="flex items-center gap-2 rounded-full bg-green-500 px-6 py-2 font-medium text-black shadow-md transition hover:bg-green-600 focus:outline-none outline-1">
                                <img
                                    src="public/system-solid-372-figures-hover-pinch.webp"
                                    alt="save icon"
                                    className="h-5 w-5"
                                />
                                Save
                            </button>
                        </div>
                    </div>
                    <div className="mt-10 w-full text-left">
                        <h2 className="text-xl font-bold text-gray-900">Your Passwords</h2>
                        <p className="mt-2 text-sm text-gray-500">No passwords to show</p>
                    </div>
                    <div className="mt-6 w-full overflow-x-auto rounded-xl border border-black bg-white/40 shadow-sm backdrop-blur-md">
                        <table className="w-full text-left text-sm text-black border-collapse table-auto">
                            <thead className="bg-green-500 text-black font-bold border-b border-black">
                                <tr className="divide-x divide-black">
                                    <th className="px-6 py-3">Site</th>
                                    <th className="px-6 py-3">Username</th>
                                    <th className="px-6 py-3">Password</th>
                                    <th className="px-6 py-3 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-black">
                                <tr className="divide-x divide-black transition-colors hover:bg-green-500/10">
                                    <td className="px-6 py-4 font-semibold text-black">
                                        The Sliding Mr. Bones (Next Stop, Pottersville)
                                    </td>
                                    <td className="px-6 py-4 text-black">Malcolm Lockyer</td>
                                    <td className="px-6 py-4 text-center text-black">1961</td>
                                    <td className="px-6 py-4 text-black">
                                        <div className="flex items-center justify-center gap-3">
                                            <button className="transition-transform hover:scale-110">
                                                <img src="/system-solid-35-pencil-hover-pinch.webp" alt="Edit" className="h-6 w-6" />
                                            </button>
                                            <button className="transition-transform hover:scale-110">
                                                <img src="/system-solid-185-trash-bin-hover-pinch.webp" alt="Delete" className="h-6 w-6" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Manager;