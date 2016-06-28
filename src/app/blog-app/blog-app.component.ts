import { Component, ViewEncapsulation, provide, Inject, OnInit } from '@angular/core';
import { RouteConfig, Router } from '@angular/router-deprecated';
import { BlogNavbarComponent } from '../blog-navbar';
import { BlogAsideComponent } from '../blog-aside';

const homeLoader = () => require('es6-promise!../home')('HomeComponent'),
  aboutLoader = () => require('es6-promise!../about')('AboutComponent'),
  blogArticleLoader = () => require('es6-promise!../blog-article')('BlogArticleComponent'),
  questionLoader = () => require('es6-promise!../question')('QuestionComponent');

@Component({
  selector: 'blog-app',
  pipes: [],
  providers: [

  ],
  directives: [BlogNavbarComponent, BlogAsideComponent],
  styles: [
    require('./blog-app.scss')
  ],
  template: require('./blog-app.html')
})
@RouteConfig([
  { path: '/', name: 'BlogIndex', loader: homeLoader, useAsDefault: true },
  { path: '/home', name: 'BlogHome', loader: homeLoader },
  { path: '/about', name: 'BlogAbout', loader: aboutLoader },
  { path: '/:id', name: 'BlogArticle', loader: blogArticleLoader },
  { path: '/question', name: 'Question', loader: questionLoader }
])
export class BlogAppComponent {

}
