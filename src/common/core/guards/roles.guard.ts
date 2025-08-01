import {
    CanActivate,
    ExecutionContext,
    Injectable,
    ForbiddenException,
  } from '@nestjs/common';
  import { Reflector } from '@nestjs/core';
  import { UserRole } from '@prisma/client';
  import { ROLES_KEY } from 'src/common/decorators/roles.decorator';
  
  @Injectable()
  export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}
  
    canActivate(context: ExecutionContext): boolean {
      const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
        ROLES_KEY,
        [context.getHandler(), context.getClass()],
      );
  
      if (!requiredRoles) return true;
  
      const request = context.switchToHttp().getRequest();
      const user = request.user;
  
      if (!user || !requiredRoles.includes(user.role)) {
        throw new ForbiddenException('Sizda bu amal uchun ruxsat yoq');
      }
  
      return true;
    }
  }
  