export default function Footer() {
    return (
        <footer className="bg-muted py-8 bottom-0 z-50">
            <div className="container mx-auto px-4 text-center">
                <p className="text-muted-foreground">
                    &copy; {new Date().getFullYear()} eKitab
                </p>
            </div> 
        </footer>
    )
}
