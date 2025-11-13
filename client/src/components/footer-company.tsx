import { Link } from 'wouter';
import { useAuth } from '@/lib/useAuth';

export default function FooterCompany(){
  const { user, loading } = useAuth();

  return (
    <div>
      <h4 className="font-semibold mb-4">Company</h4>
      <ul className="space-y-3 text-sm text-muted-foreground">
        <li><a href="#" className="hover:text-foreground transition-colors" data-testid="footer-link-about">About</a></li>
        <li><a href="#" className="hover:text-foreground transition-colors" data-testid="footer-link-blog">Blog</a></li>
        <li><a href="#" className="hover:text-foreground transition-colors" data-testid="footer-link-careers">Careers</a></li>
        {user?.isAdmin && (
          <li><Link href="/admin" className="hover:text-foreground transition-colors" data-testid="footer-link-admin">Admin</Link></li>
        )}
      </ul>
    </div>
  );
}
