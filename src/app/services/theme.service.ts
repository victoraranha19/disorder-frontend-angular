// src/app/services/theme.service.ts
import { inject, Injectable, Renderer2, RendererFactory2, signal } from '@angular/core';

export type TTheme = 'light-theme' | 'dark-theme'; // Define os tipos de tema possíveis

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private renderer: Renderer2;
  private readonly THEME_KEY = 'app-theme'; // Chave para armazenar no localStorage

  currentTheme = signal<TTheme>('light-theme'); // Signal para o tema atual

  readonly #rendererFactory = inject(RendererFactory2);

  constructor() {
    this.renderer = this.#rendererFactory.createRenderer(null, null);
    this._loadTheme(); // Carrega o tema ao iniciar o serviço
  }

  /**
   * Define o tema da aplicação.
   * @param theme 'light' ou 'dark'.
   */
  setTheme(theme: TTheme): void {
    this.renderer.removeClass(document.body, 'light-theme');
    this.renderer.removeClass(document.body, 'dark-theme');
    this.renderer.addClass(document.body, `${theme}`);
    this.currentTheme.set(theme);
    this._saveTheme(theme);
  }

  /**
   * Alterna entre o tema claro e escuro.
   * @param isDarkMode Se true, aplica o tema escuro; se false, aplica o tema claro.
   */
  toggleTheme(): void {
    const isDarkMode = this.currentTheme() === 'dark-theme';
    console.log('Toggling theme', this.currentTheme(), isDarkMode);
    if (isDarkMode) {
      this.setTheme('light-theme');
    } else {
      this.setTheme('dark-theme');
    }
  }

  /**
   * Salva a preferência do tema no localStorage.
   * @param theme 'light' ou 'dark'.
   */
  private _saveTheme(theme: TTheme): void {
    localStorage.setItem(this.THEME_KEY, theme);
  }

  /**
   * Carrega o tema salvo no localStorage ou detecta a preferência do sistema.
   */
  private _loadTheme(): void {
    const savedTheme = localStorage.getItem(this.THEME_KEY);

    if (savedTheme === 'dark-theme') {
      this.setTheme('dark-theme');
    } else if (savedTheme === 'light-theme') {
      this.setTheme('light-theme');
    } else {
      // Se não houver preferência salva, verifica a preferência do sistema
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        this.setTheme('dark-theme'); // Aplica tema escuro se o sistema preferir
      } else {
        this.setTheme('light-theme'); // Aplica tema claro por padrão ou se o sistema preferir
      }
    }
  }
}
