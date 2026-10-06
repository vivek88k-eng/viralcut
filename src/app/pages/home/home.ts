import { Component } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar';
import { Hero } from '../../components/hero/hero';
import { Services } from '../../components/services/services';

@Component({
  selector: 'app-home',
  standalone:true,
  imports: [Navbar, Hero, Services],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
