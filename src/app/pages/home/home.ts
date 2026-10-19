import { Component } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar';
import { Hero } from '../../components/hero/hero';
import { Services } from '../../components/services/services';
import { Benefits } from '../../components/benefits/benefits';

@Component({
  selector: 'app-home',
  standalone:true,
  imports: [Navbar, Hero, Services, Benefits],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
