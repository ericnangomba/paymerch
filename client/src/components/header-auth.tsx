import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/useAuth';

export default function HeaderAuth(){
  const { user, loading, logout } = useAuth();
  const isHomePage = window.location.pathname === '/';

  if (loading) {
    return <div className="h-9 w-36 animate-pulse rounded-md bg-muted" />;
  }

  if (isHomePage) {
    return (
      <div className="flex items-center gap-4">
        <Link href="/signin" data-testid="link-signin">
          <Button variant="ghost">Sign In</Button>
        </Link>
        <Link href="/signup" data-testid="button-get-started-header">
          <Button>Get Started</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <Link href="/signin" data-testid="link-signin">
        <Button variant="ghost">Sign In</Button>
      </Link>
      <Link href="/signup" data-testid="button-get-started-header">
        <Button>Get Started</Button>
      </Link>
      <button onClick={logout} className="btn btn-logout">Logout</button>
    </div>
  );
}
