import * as signalR from '@microsoft/signalr';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SignalRService {
  private hubConnection!: signalR.HubConnection;

  startConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7215/employeeHub', {
        withCredentials: true,
      })
      .withAutomaticReconnect()
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('Connected to SignalR'))
      .catch((err) => console.log(err));
  }

  addListener(callback: any) {
    this.hubConnection.on('ReceiveUpdate', callback);
  }

  removeListener() {
    if (this.hubConnection) {
      this.hubConnection.off('ReceiveUpdate');
    }
  }
}
