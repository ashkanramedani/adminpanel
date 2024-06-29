import { Component } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent {
  users:any
  q: number = 1;
  constructor() {
    this.users = [
   {name: "Anyiuiil Singh", qualification: ["B.Sc.", "MCA", "MCTS", "MCP"]},
   {name: "yuuy Singhrtr", qualification: ["B.Sc.", "MCA", "MCTS", "MCP"]},
   {name: "rtr Singh", qualification: ["B.Sc.", "MCA", "MCTS", "MCP"]},
   {name: "gfg gf", qualification: ["B.Sc.", "MCA", "MCTS", "MCP"]},
   {name: "Aerernil dfd", qualification: ["B.Sc.", "MCA", "MCTS", "MCP"]},
   {name: "Atytynil tyyt", qualification: ["B.Sc.", "MCA", "MCTS", "MCP"]},
   {name: "Reena Singh", qualification: ["B A", "M A", "BTC"]}
 ];
}
}
