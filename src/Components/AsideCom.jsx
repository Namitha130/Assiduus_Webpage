import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import DescriptionIcon from "@mui/icons-material/Description";
import PersonIcon from "@mui/icons-material/Person";
import ContactsIcon from "@mui/icons-material/Contacts";
import { NavLink } from "react-router-dom";

const AsideCom = () => {
  return (
    <aside>
      <ul id="aside">
        <li>
          <NavLink to="/" activeclassName="active">
            <DashboardIcon /> <p>Dashboard</p>
          </NavLink>
        </li>

        <li>
          <NavLink to="/account" activeclassName="active">
            <AccountBalanceWalletIcon /> <p>Accounts</p>
          </NavLink>
        </li>

        <li>
          <NavLink to="/payroll" activeclassName="active">
            <i class="bx bx-dollar"></i> <p>Payrolls</p>
          </NavLink>
        </li>

        <li>
          <NavLink to="/report" activeclassName="active">
            <DescriptionIcon /> <p>Reports</p>
          </NavLink>
        </li>

        <li>
          <NavLink to="/advisor" activeclassName="active">
            <PersonIcon /> <p>Advisors</p>
          </NavLink>
        </li>

        <li>
          <NavLink to="/contact" activeclassName="active">
            <ContactsIcon /> <p>Contacts</p>
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default AsideCom;
