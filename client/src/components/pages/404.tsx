import { Link } from "react-router-dom";
import { Button } from "@radix-ui/themes";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

function NotFound() {
    return (
        <>
            <div className="container mx-auto px-4 py-16 text-tertiary text-center">
                <ExclamationTriangleIcon className="h-16 w-16 mx-auto text-inherit text-muted-foreground mb-6" />
                <h1 className="text-inherit text-4xl font-bold mb-4">404 - Page Not Found</h1>
                <p className="text-inherit text-muted-foreground mb-8 max-w-md mx-auto">
                    The page you are looking for doesn't exist.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild className="text-inherit">
                        <Link to="/">Go Home</Link>
                    </Button>
                </div>
            </div>
        </>
    );
}

export default NotFound;
