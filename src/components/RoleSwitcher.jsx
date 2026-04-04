import { useDispatch, useSelector } from "react-redux";
import { setRole } from "../redux/financeSlice";

const RoleSwitcher = () => {
  const dispatch = useDispatch();
  const role = useSelector((s) => s.finance.role);

  return (
    <select
      value={role}
      onChange={(e) => dispatch(setRole(e.target.value))}
      className="
        px-4 py-2 rounded-lg font-medium
        bg-gray-100
        text-gray-700
        border border-gray-300
        hover:bg-gray-200
        focus:outline-none focus:ring-2 focus:ring-indigo-500
        focus:ring-offset-2
        transition-all duration-200
        shadow-sm hover:shadow-md
        cursor-pointer
      "
    >
      <option value="viewer">👁️ Viewer</option>
      <option value="admin">🔧 Admin</option>
    </select>
  );
};

export default RoleSwitcher;