
export const Page = ({ params }: { params: { codeId: string } }) => {
  const id = params.codeId;

  return (
    <div>
      <h1>Management Page</h1>
      <p>ID: {id}</p>
    </div>
  );
}

export default Page;