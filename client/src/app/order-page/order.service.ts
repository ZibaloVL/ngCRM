import { Injectable } from '@angular/core';
import { Position, OrderPosition } from '../shared/interfaces';
import { PositionsService } from '../shared/services/positions.service';

@Injectable()


export class OrderService {

  public list: OrderPosition[] = [];
  public price = 0;

  add( position: Position ) {
    const orderPosition: OrderPosition = Object.assign (
      {}, {
        _id: position._id,
        name: position.name,
        cost: position.cost,
        quantity: position.quantity
      }
    );
    const candidate = this.list.find( p => p._id === orderPosition._id );
    if ( candidate ) {
      candidate.quantity += orderPosition.quantity;
    } else {
      this.list.push( orderPosition );
    }
    this.computePrice();
  }

  private computePrice() {
    this.price = this.list.reduce( (total, item) => {
      return total += item.cost * item.quantity;
   }, 0);
  }

  remove( position: OrderPosition ){
    const indx = this.list.findIndex ( p => p._id === position._id );
    this.list[indx].quantity --;

    if (!this.list[indx].quantity) {
      this.list.splice( indx, 1);
    }
    this.computePrice();
  }

  clear(){}
}
