export default function Page({ params }: { params: { codeId: string } }) {
    const id = params.codeId;
  
    return (
      <div>
        <h1>Analytics Page</h1>
        <p>ID: {id}</p>
      </div>
    );
  }
