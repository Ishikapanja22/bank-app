const PendingApproval = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="bg-white p-10 rounded shadow-lg text-center">
        <h1 className="text-4xl text-red-500">
          Waiting For Admin Approval
        </h1>
      </div>
    </div>
  );
};

export default PendingApproval;