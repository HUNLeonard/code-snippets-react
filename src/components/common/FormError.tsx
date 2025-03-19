export const FormError = ({ error }: { error: string | undefined }) => {
  return (
    <>
      {!!error?.length && (
        <p className="text-red-500 font-bold text-sm mt-1 px-1">{error}</p>
      )}
    </>
  )
}
