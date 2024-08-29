import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../services/api/auth/auth.service";

@Injectable()
export class AdminAuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        const isAdmin = localStorage.getItem('isAdmin') || 'false';
        if (!JSON.parse(isAdmin)) {
            this.router.navigate(['/'])
        }
        return JSON.parse(isAdmin);
    }
}