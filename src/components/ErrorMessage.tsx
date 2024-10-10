export default function ErrorMessage({children} : {children: React.ReactNode}) {
    return (
        <div className="w-full bg-red-600 text-white font-bold p-2 rounded-lg text-center">{children}</div>
    )
}
