import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect, useRef } from 'react';
import { ToastContainer, toast, Bounce } from 'react-toastify';

const Manager = () => {
    const [form, setForm] = useState({ site: "", username: "", password: "" })
    const [dataArray, setdataArray] = useState([])
    const typeRef = useRef()
    const passwordRef = useRef()

    useEffect(() => {
        const saved = localStorage.getItem("passwords");
        if (saved) {
            setdataArray(JSON.parse(saved));
        }
    }, [])

    const handleAdd = () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
            const updated = [...dataArray, { ...form, id: uuidv4() }];
            setdataArray(updated);
            localStorage.setItem("passwords", JSON.stringify(updated));
            setForm({ site: "", username: "", password: "" });
            toast.success("Password saved successfully!");
        } else {
            toast.error("Error: All fields must be longer than 3 characters!");
        }
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleEdit = (id) => {
        let edit = dataArray.find(item => item.id === id);
        if (edit) {
            setForm(edit);
            let newData = dataArray.filter(item => item.id !== id);
            setdataArray(newData);
            localStorage.setItem("passwords", JSON.stringify(newData));
        }
    }

    const handleDelete = (id) => {
        let c = confirm("Do you really want to delete this password?")
        if (c) {
            let newData = dataArray.filter(item => item.id !== id);
            setdataArray(newData);
            localStorage.setItem("passwords", JSON.stringify(newData));
            toast.info("Password Deleted!");
        }
    }

    const copyText = (text) => {
        navigator.clipboard.writeText(text);
        toast.info("Copied to clipboard!");
    }

    const showPassword = () =>{
        if(passwordRef.current.src.includes('/eye.svg')){
            passwordRef.current.src = '/crossedeye.svg'
            typeRef.current.type = "password"
        } else{
            passwordRef.current.src = '/eye.svg'
            typeRef.current.type = "text"
        }
    }
    return (
        <>
            <ToastContainer
                className="top-16!"
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition={Bounce}
            />
            <main className="relative flex flex-col justify-center items-center font-playpen">
                <div className="mx-auto w-2/3 px-4 py-8 sm:px-6 lg:px-8 bg-white/30 backdrop-blur-md border border-white/40 shadow-lg rounded-2xl my-6 min-h-[80vh]">
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
                                value={form.site}
                                name="site"
                                onChange={handleChange}
                                placeholder="Enter Website URL"
                                className="w-full rounded-full border border-green-500 bg-white/70 px-4 py-2 text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-green-500"
                            />
                            <div className="flex flex-col gap-4 sm:flex-row">
                                <input
                                    type="text"
                                    value={form.username}
                                    onChange={handleChange}
                                    name="username"
                                    placeholder="Enter Username"
                                    className="w-full rounded-full border border-green-500 bg-white/70 px-4 py-2 text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-green-500"
                                />
                                <div className="relative w-full sm:w-1/2">
                                    <input ref={typeRef}
                                        type="password"
                                        value={form.password}
                                        onChange={handleChange}
                                        name="password"
                                        placeholder="Enter Password"
                                        className="w-full rounded-full border border-green-500 bg-white/70 px-4 py-2 text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-green-500"
                                    />
                                    <span><img ref={passwordRef} src="/crossedeye.svg" alt="CrossedEye" className="absolute right-4 bottom-2 hover:cursor-pointer" onClick={showPassword} /></span>
                                </div>
                            </div>
                            <div className="mt-2 flex justify-center">
                                <button onClick={() => handleAdd()} className="flex items-center gap-2 rounded-full bg-green-500 px-6 py-2 font-medium text-black shadow-md transition hover:bg-green-600 focus:outline-none outline-1">
                                    <img
                                        src="/system-solid-372-figures-hover-pinch.webp"
                                        alt="save icon"
                                        className="h-5 w-5"
                                    />
                                    Save
                                </button>
                            </div>
                        </div>
                        <div className="mt-10 w-full text-left">
                            <h2 className="text-xl font-bold text-gray-900">Your Passwords</h2>
                            {dataArray.length === 0 && <p className="mt-2 text-sm text-gray-500">No passwords to show</p>}
                        </div>
                        <div className="mt-6 w-full overflow-x-auto rounded-xl border border-black bg-white/40 shadow-sm backdrop-blur-md">
                            <table className="w-full text-left text-sm text-black border-collapse table-fixed">
                                <thead className="bg-green-500 text-black font-bold border-b border-black">
                                    <tr className="divide-x divide-black">
                                        <th className="px-6 py-3 w-1/2 wrap-break-word">Site - Click to Redirect</th>
                                        <th className="px-6 py-3 w-1/4 wrap-break-word">Username</th>
                                        <th className="px-6 py-3 w-1/4 wrap-break-word">Password</th>
                                        <th className="px-2 py-3 text-center w-28">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-black">
                                    {dataArray.map(item => {
                                        return <tr key={item.id} className="divide-x divide-black transition-colors hover:bg-green-500/10">
                                            <td className="px-6 py-4 font-semibold text-black wrap-break-word">
                                                <a href={item.site.startsWith('http') ? item.site : `https://${item.site}`} target='_blank' className="hover:underline">
                                                    {item.site}
                                                </a>
                                            </td>
                                            <td className="px-6 py-4 text-black wrap-break-word">
                                                <div className="flex items-center justify-between gap-2">
                                                    <span>{item.username}</span>
                                                    <img 
                                                        src="/copy.svg" 
                                                        alt="copy" 
                                                        className="h-5 w-5 cursor-pointer transition-transform hover:scale-110 shrink-0" 
                                                        onClick={() => copyText(item.username)}
                                                    />
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-black wrap-break-word">
                                                <div className="flex items-center justify-between gap-2">
                                                    <span>[Encrypted...]</span>
                                                    <img 
                                                        src="/copy.svg" 
                                                        alt="copy" 
                                                        className="h-5 w-5 cursor-pointer transition-transform hover:scale-110 shrink-0" 
                                                        onClick={() => copyText(item.password)}
                                                    />
                                                </div>
                                            </td>
                                            <td className="px-2 py-4 text-black">
                                                <div className="flex items-center justify-center gap-2">
                                                    <button onClick={() => handleEdit(item.id)} className="transition-transform hover:scale-110">
                                                        <img src="/system-solid-35-pencil-hover-pinch.webp" alt="Edit" className="h-6 w-6" />
                                                    </button>
                                                    <button onClick={() => handleDelete(item.id)} className="transition-transform hover:scale-110">
                                                        <img src="/system-solid-185-trash-bin-hover-pinch.webp" alt="Delete" className="h-6 w-6" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Manager;