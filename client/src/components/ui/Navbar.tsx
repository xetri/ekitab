import { Link } from "@radix-ui/themes";
import LoginModalButton from "@ui/AuthDialog";

type Props = {}

function Navbar({}: Props) {
  return (
      <nav className="p-4 flex justify-between items-center bg-white shadow-md">
        <h1 className="text-2xl font-bold space-x">
            📚 &nbsp;
            <Link href="/">
                eKitab
            </Link>
        </h1>

        <div>
            <LoginModalButton/>
        </div>
    </nav>
  )
}

export default Navbar;
