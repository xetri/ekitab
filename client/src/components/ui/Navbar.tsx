import { Button } from "@radix-ui/themes";
import { Link } from "react-router-dom";
import { useAuth } from "@lib/store/auth";
import { useAuthDialog } from "@lib/store/auth-dialog";
import ProfileIcon from "@ui/ProfileIcon";

type Props = {}

function Navbar({}: Props) {
  const auth = useAuth();
  const authDialog = useAuthDialog();

  const handleLogin = () => {
    authDialog.setOpen(true);
  }

  return (
      <nav className="py-4 px-2 flex justify-between items-center text-primary bg-hero shadow-md sticky top-0 z-50">
        <h1 className="text-2xl font-bold space-x text-inherit">
            📚 &nbsp;
            <Link to="/">
                eKitab
            </Link>
        </h1>

        <div>
          {
            auth.loggedIn ? (
              <ProfileIcon/>
            ) :
            <Button 
              className="bg-neutral text-inherit font-semibold" 
              onClick={handleLogin}
            >
              Login
            </Button>
          }
        </div>
    </nav>
  )
}

export default Navbar;
