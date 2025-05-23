import { Component, ElementRef, HostListener, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';

import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { OverlayPanel } from 'primeng/overlaypanel';
import { JwtPayload } from 'src/app/Models/Payload/JwtPayload';
import { AuthService } from 'src/app/service/authService/auth.service';
import { LayoutService } from './service/app.layout.service';


@Component({
  selector: 'app-topbar-employe',
  templateUrl: './app.topbarEmploye.component.html'
})
export class AppTopBarComponent implements OnInit {

  items!: MenuItem;

  @ViewChild('menubutton') menuButton!: ElementRef;
  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;
  @ViewChild('topbarmenu') menu!: ElementRef;
  @ViewChild('notificationPanel') notificationPanel!: OverlayPanel;
 
  url: any;
  token: any;
  employeData: any;
  email: any;
  name: any;
  id: any;
  loggedIn: boolean = false;
  notifications: any[] = [];
  employeId: any;
  showNotification: boolean = false;
  selectedNotification: any;
  selectedNotificationType: any;
  filteredNotifications?: any[];
  selectedNotificationTypes: any;
  originalNotifications: any;
  newNotificationCount: number = 0;
  isPanelOpen:any;
  notificationTypes = [
    { label: 'Congé', value: 'conge' },
    { label: 'Autorisation', value: 'autorisation' },
    { label: 'Ordre de mission', value: 'ordre_de_mission' }
  ];
  cdr: any;
  documentState: any;
  private subscription?: Subscription;

    userInfo: JwtPayload | null = null;
  
  constructor(
    public layoutService: LayoutService,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    
    this.userInfo = this.authService.getUserInfo();

  }
  groupNotificationsByDate(notifications: any[]): any[] {
    const groupedNotifications: any[] = [];
    notifications.forEach(notificationGroup => {
      notificationGroup.notifications.forEach((notification:any) => {
        const dayLabel = this.isTodayOrYesterday(this.formatDate(notification.created_at));
        const existingGroup = groupedNotifications.find(group => group.date === dayLabel && group.type === notificationGroup.type);

        if (existingGroup) {
          existingGroup.notifications.push(notification);
        } else {
          groupedNotifications.push({
            type: notificationGroup.type,
            date: dayLabel,
            notifications: [notification]
          });
        }
      });
    });

    return groupedNotifications;
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }


  ngOnChanges(changes: SimpleChanges) {
    if (changes) {
      console.log(changes)
      this.getUnreadNotificationCount();
    }
  }
  handleDocumentClick(event: MouseEvent): void {
    this.documentState = { event: 'click', details: event };
  }



  getUnreadNotificationCount() {
    this.newNotificationCount  = 0;
    this.notifications.forEach(notificationGroup => {
      notificationGroup.notifications.forEach((notification:any) => {
        if (!notification.lu) {
          this.newNotificationCount++;
        }
      });
    });
    return this.newNotificationCount;
  }



  isSameDay(date1: Date, date2: Date): boolean {
    return date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear();

  }
  onMultiSelectChange(event: any) {
    const selectedValues = event.value;
    this.filteredNotifications = [];

    if (selectedValues && selectedValues.length > 0) {
        selectedValues.forEach((selectedValue: any) => {
            const matchingNotifications = this.notifications.filter((notification: any) => {
                return notification.type === selectedValue.value;
            });
            this.filteredNotifications?.push(...matchingNotifications);
            console.log(this.filteredNotifications);

        });
    } else {
        this.filteredNotifications = this.notifications;
    }
}



  sortNotificationsByDate(notifications: any[]): any[] {
    return notifications.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }
  addNewNotification(notification: any) {
    this.notifications.unshift(notification);
    this.newNotificationCount++;
  }

  isTodayOrYesterday(date: string): string {
    const notificationDate = new Date(date);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const midnightToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const midnightYesterday = new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate());

    if (notificationDate >= midnightToday) {
      return 'Aujourd\'hui';
    } else if (notificationDate >= midnightYesterday) {
      return 'Hier';
    } else {
      return date;
    }
}

  formatDate(created_at: any): string {
    const date = created_at.date.split('/').reverse().join('-');
    const time = created_at.time;
    return `${date}T${time}`;
  }


  formatDuree(dureeEnMinutes: number): string {
    const heures = Math.floor(dureeEnMinutes / 60);
    const minutes = dureeEnMinutes % 60;

    let formattedDuree = '';
    if (heures > 0) {
      formattedDuree += heures + ' heure';
      if (heures !== 1) {
        formattedDuree += 's';
      }
      if (minutes > 0) {
        formattedDuree += ' ';
      }
    }
    if (minutes > 0 || heures === 0) {
      formattedDuree += minutes + ' minute';
      if (minutes !== 1) {
        formattedDuree += 's';
      }
    }

    return formattedDuree;
  }

  formatTime(timeString: string): string {
    const [hour, minute] = timeString.split(':');
    return `${hour}:${minute}`;
  }

  openNotification(notification: any) {
    this.selectedNotification = notification;
    console.log(this.selectedNotification);
    this.showNotification = true;
    console.log(this.showNotification);
  }

  closeNotification() {
    this.showNotification = false;
  }


  showNotificationPanel(event: Event) {

    if (this.notificationPanel) {
      if (this.isPanelOpen) {
        this.notificationPanel.hide();
        this.isPanelOpen = false;
        console.log(this.isPanelOpen);

      } else {
        this.notificationPanel.show(event);
        this.isPanelOpen = true;
        console.log(this.isPanelOpen);
      }
    }

    this.selectedNotificationTypes = [];
  }

}
