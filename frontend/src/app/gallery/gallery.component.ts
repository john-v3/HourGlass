import { Component, OnInit } from '@angular/core';
import { DbService } from '../db.service'
import { observable, of } from 'rxjs'

import { ContentContainer } from '../contentContainer'
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { MessageService } from '../message.service'

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  // add injectable services into constructor to access
  // services
  constructor(private dbService: DbService,
    private messageService: MessageService) { }

  selectedContent: ContentContainer;

  contents: ContentContainer[];

  ngOnInit(): void {
    this.getContents();
  }

  // getter function to get all content entries
  getContents(): void {
    this.dbService.getContent()
    .subscribe(contents => this.contents = contents);
  }

  // when someone selects an item
  onSelect(content: ContentContainer): void {
    this.selectedContent = content;
    this.messageService.add(
      `Selected contentcontainer ${content.title}`);
  }

  isPicture(file: String): Boolean{
    file = file.toLowerCase();
    if(file.endsWith('.jpeg') || file.endsWith('.gif')
    || file.endsWith('.tiff') || file.endsWith('.bmp')
    || file.endsWith('.jpg')  || file.endsWith('.pdf')
    || file.endsWith('.eps')  || file.endsWith('.raw')
    || file.endsWith('.png'))
    return true;

    else
      return false;

  }
}
