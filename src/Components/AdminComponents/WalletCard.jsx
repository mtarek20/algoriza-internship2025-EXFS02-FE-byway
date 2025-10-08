import ChartsImg from "../../assets/images/stats1.png";

export default function WalletCard() {
  return (
    <div className=" bg-white rounded-2xl shadow-sm border border-gray-200 p-5 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold text-gray-800">Wallet</h3>
        <button className="text-sm text-gray-500 border border-gray-300 rounded-md px-2 py-1 hover:bg-gray-50">
          This month
        </button>
      </div>

      {/* Balance */}
      <div className="space-y-1 mb-4 mt-5">
        <h2 className="text-3xl font-bold text-gray-900">$37.5K</h2>
        <div className="flex items-center space-x-2">
          <p className="text-sm text-gray-500">Wallet Balance</p>
          <span className="text-sm font-medium text-green-600">+2.45%</span>
        </div>
      </div>

      <div className="flex items-start justify-between space-x-5">
        <div className="mt-6">
          {/* Status */}
          <div className="flex items-center space-x-2 mb-4">
            <span className="w-3 h-3 bg-green-500 rounded-full"></span>
            <p className="text-size-16 text-green-600  font-medium">
              On your account
            </p>
          </div>

          {/*  legend */}
          <div className="flex items-center justify-between mt-auto">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-indigo-500"></span>
                <span className="text-sm text-gray-600">Deposits</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-cyan-400"></span>
                <span className="text-sm text-gray-600">Withdrawals</span>
              </div>
            </div>
          </div>
        </div>

        <img src={ChartsImg} alt="Wallet Chart" className="w-90 object-cover" />
      </div>
    </div>
  );
}
