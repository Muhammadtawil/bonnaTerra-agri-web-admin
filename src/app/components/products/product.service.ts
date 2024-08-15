import { Injectable } from '@angular/core';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products: Product[] = [
    {id:1, title: 'Melons', season: 'May to September', imageUrl: '../../../assets/img/products_img/fruits/Melons.jpg', category: 'Fruits',description:'' },
    {id:2,title: 'Watermelon', season: 'May to September', imageUrl:'../../../assets/img/products_img/fruits/Watermelon.jpg' , category: 'Fruits' ,description:''},
    {id:3, title: 'Apricot', season: 'May to August', imageUrl: '../../../assets/img/products_img/fruits/APRICOT.jpg', category: 'Fruits' ,description:''},
    {id:4, title: 'Peach', season: 'May to September', imageUrl: '../../../assets/img/products_img/fruits/PEACH.jpg', category: 'Fruits' ,description:''},
    {id:5, title: 'Clementine', season: 'November to February', imageUrl: '../../../assets/img/products_img/fruits/CLEMENTINE.jpg', category: 'Fruits',description:'' },
    {id:6, title: 'Abou Sarrar', season: 'November to January', imageUrl: '', category: 'Fruits',description:'' },
    {id:7, title: 'Lemon', season: 'Year-round', imageUrl: '../../../assets/img/products_img/fruits/LEMON.jpg', category: 'Fruits',description:'' },
    {id:8, title: 'Avocado', season: 'November to March', imageUrl: '../../../assets/products_img/img/fruits/AVOCADO.jpg', category: 'Fruits',description:'' },
    {id:9, title: 'Mulberry', season: 'April to July', imageUrl: '../../../assets/img/products_img/fruits/MULBERRY.jpg', category: 'Fruits' ,description:''},
    {id:10, title: 'Carnop', season: 'May to July', imageUrl:'', category: 'Fruits' ,description:''},
    {id:11, title: 'Mexican Apple', season: 'May to July', imageUrl:'../../../assets/img/products_img/fruits/Mexican-Apple.jpg', category: 'Fruits',description:'' },
    {id:12, title: 'White Grapes', season: 'June to September', imageUrl:'../../../assets/img/products_img/fruits/White-Grapes.jpg', category: 'Fruits',description:'' },
    {id:13, title: 'Red Grapes', season: 'June to October', imageUrl:'../../../assets/img/products_img/fruits/Red-Grapes.jpg', category: 'Fruits' ,description:''},
    {id:14, title: 'Pomegranate', season: 'September to November', imageUrl:'../../../assets/img/products_img/fruits/Pomegranate.jpg', category: 'Fruits',description:'' },
    {id:15,title: 'Passion Fruits', season: 'July to October', imageUrl:'../../../assets/img/products_img/fruits/Passion-Fruits.jpg', category: 'Fruits',description:'' },
    {id:16, title: 'Grapefruit', season: 'October to February', imageUrl:'../../../assets/img/products_img/fruits/Grapefruit.jpg', category: 'Fruits',description:'' },
    {id:17, title: 'Pomello', season: 'October to February', imageUrl:'../../../assets/img/products_img/fruits/POMELLO.jpg', category: 'Fruits',description:'' },
    {id:18, title: 'Kaki', season: 'September to November', imageUrl:'../../../assets/img/products_img/fruits/Kaki.jpg', category: 'Fruits' ,description:''},
    {id:19, title: 'Ashta', season: 'June to August', imageUrl:'../../../assets/img/products_img/fruits/Ashta.jpg', category: 'Fruits',description:'' },
    {id:20, title: 'Orange', season: 'December to May', imageUrl:'../../../assets/img/products_img/fruits/Orange.jpg', category: 'Fruits',description:'' },
    {id:21,title: 'Figs', season: 'June to September', imageUrl:'../../../assets/img/products_img/fruits/FIGS.jpg', category: 'Fruits' ,description:''},
    {id:22, title: 'Guava', season: 'September to December', imageUrl:'../../../assets/img/products_img/fruits/Guava.jpg', category: 'Fruits',description:'' },
    {id:23, title: 'Akidenia', season: 'September to November', imageUrl:'', category: 'Fruits' ,description:''},
    {id:24, title: 'Afandi', season: 'September to November', imageUrl:'', category: 'Fruits',description:''},
    {id:25,title: 'Sfarjel', season: 'October to December', imageUrl:'', category: 'Fruits',description:'' },
    {id:26, title: 'Ennab', season: 'August to October', imageUrl:'../../../assets/img/fruits/Ennab.jpg', category: 'Fruits',description:'' },
    {id:27,title: 'Arasia', season: 'August to October', imageUrl:'', category: 'Fruits',description:'' },
    { id: 28, title: 'Walnut', season: 'September to November', imageUrl: '../../../assets/img/products_img/fruits/Walnut.jpg', category: 'Fruits', description: '' },

    
    {id: 29, title: 'Loubieh', season: 'May to November', imageUrl: '../../../assets/img/products_img/Vegetable/Loubieh.jpg', category: 'Vegetables',description:'' },
    { id: 30,title: 'Zucchini', season: 'Year-round', imageUrl: '../../../assets/img/products_img/Vegetable/Zucchini.jpg', category: 'Vegetables',description:' '},
    { id: 31,title: 'Cherry Tomato', season: 'Year-round', imageUrl: '../../../assets/img/products_img/Vegetable/Cherry-Tomato.jpg', category: 'Vegetables',description:'' },
    {id: 32, title: 'Coriander', season: 'Year-round', imageUrl: '../../../assets/img/products_img/Vegetable/Coriander.jpg', category: 'Vegetables' ,description:''},
    {id: 33, title: 'Parsley', season: 'Year-round', imageUrl: '../../../assets/img/products_img/Vegetable/Parsley.jpg', category: 'Vegetables' ,description:''},
    { id: 34,title: 'Rocca', season: 'Year-round', imageUrl: '', category: 'Vegetables' ,description:''},
    { id: 35,title: 'Okra', season: 'June to September', imageUrl: '../../../assets/img/products_img/Vegetable/Okra.jpg', category: 'Vegetables' ,description:''},
    {id: 36, title: 'Lettuce', season: 'Year-round', imageUrl: '../../../assets/img/products_img/Vegetable/Lettuce.jpg', category: 'Vegetables',description:'' },
    {id: 37, title: 'Iceberg Lettuce', season: 'Year-round', imageUrl: '../../../assets/img/products_img/Vegetable/Iceberg-Lettuce.jpg', category: 'Vegetables' ,description:''},
    {id: 38, title: 'Olives', season: 'October to December', imageUrl:'../../../assets/img/products_img/Vegetable/Olives.jpg', category: 'Vegetables' ,description:''},
    {id: 39, title: 'Thyme', season: 'Year-round', imageUrl: '', category: 'Vegetable' ,description:''},
    { id: 40, title: 'Oregano', season: 'Year-round', imageUrl: '../../../assets/img/products_img/Vegetable/Oregano.jpg', category: 'Vegetables', description: ' ' },
    

    { id: 41, title: 'MiLK', season: 'Year-round', imageUrl: '../../../assets/img/products_img/dairy/milk.jpg', category: 'Dairy products', description: ' ' },

    {id: 42, title: 'Strawberry Jam', season: 'Year-round', imageUrl: '../../../assets/img/products_img/longshelf/strawberry-jam.jpg', category: 'Long shelf',description:' '}
    



  ];

  getProducts(): Product[] {
    return this.products;
  }
}
