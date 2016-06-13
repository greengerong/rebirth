import { Component, ViewEncapsulation, provide, Inject, OnInit } from '@angular/core';
import { RouteConfig, Router } from '@angular/router-deprecated';
import {BlogNavbar } from '../blog-navbar';
import {BlogAside} from '../blog-aside';

const homeLoader = () => require('es6-promise!../home')('Home'),
  aboutLoader = () => require('es6-promise!../about')('About'),
  blogArticleLoader = () => require('es6-promise!../blog-article')('BlogArticle');

@Component({
  selector: 'blog-app',
  pipes: [],
  providers: [

  ],
  directives: [BlogNavbar, BlogAside],
  styles: [
    require('./blog-app.scss')
  ],
  template: require('./blog-app.html')
})
@RouteConfig([
  { path: '/', name: 'BlogIndex', loader: homeLoader, useAsDefault: true },
  { path: '/home', name: 'BlogHome', loader: homeLoader },
  { path: '/about', name: 'BlogAbout', loader: aboutLoader },
  { path: '/:id', name: 'BlogArticle', loader: blogArticleLoader }
])
export class BlogApp {
  constructor() {
  }
}
