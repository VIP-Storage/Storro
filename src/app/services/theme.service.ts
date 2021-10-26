import {ApplicationRef, Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  themes = ["dark-theme", "light-theme"]; // <- list all themes in this array
  theme = new BehaviorSubject("light-theme"); // <- initial theme

  constructor(private ref: ApplicationRef) {
    // Initially check if dark mode is enabled on system
    const darkModeOn = this.checkTheme();

    // If dark mode is enabled then directly switch to the dark-theme
    if(darkModeOn){
      this.theme.next("dark-theme");
    }

    // Watch for changes of the preference
    window.matchMedia("(prefers-color-scheme: dark)").addListener(e => {
      const turnOn = e.matches;
      this.changeTheme(turnOn);
    });
  }

  changeTheme(darkMode: boolean) {
    const themeValue = darkMode ? "dark-theme" : "light-theme";

    this.theme.next(themeValue);
    sessionStorage.setItem('theme', themeValue);

    // Trigger refresh of UI
    this.ref.tick();
  }

  private checkTheme(): boolean {
    const darkModeOn =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (darkModeOn) {
      return true;
    }

    const sessionTheme = sessionStorage.getItem('theme');

    if (!!sessionTheme) {
      return sessionTheme === 'dark-theme';
    }

    return false;
  }
}
