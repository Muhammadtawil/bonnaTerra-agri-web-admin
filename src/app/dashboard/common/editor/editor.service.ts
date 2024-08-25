import { Injectable } from '@angular/core';
import { Editor, Toolbar } from 'ngx-editor';

@Injectable({
  providedIn: 'root'
})
export class EditorService {
  private editor: Editor;

  constructor() {
    this.editor = new Editor();
  }

  getEditor(): Editor {
    return this.editor;
  }

  getToolbar(): Toolbar {
    return [
      ['bold', 'italic'],
      ['underline', 'strike'],
      ['code', 'blockquote'],
      ['ordered_list', 'bullet_list'],
      [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
      ['link', 'image'],
      ['text_color', 'background_color'],
      ['align_left', 'align_center', 'align_right', 'align_justify'],
    ];
  }

  destroyEditor(): void {
    this.editor.destroy();
  }
}
