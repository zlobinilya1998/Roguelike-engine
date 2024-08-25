import { ExperienceBar } from "@/components/Hud/Player/ExperienceBar"
import { HealthBar } from "@/components/Hud/Player/HealthBar"
import { Skills } from "@/components/Hud/Player/Skills"

export class HUD {
  constructor() {

    setTimeout(() => {
      this.draw();
    }, 100)
  }
  list = [new HealthBar(), new ExperienceBar(), new Skills()]

  get entities() {
    return this.list
  }

  draw() {
    this.entities.forEach(entity => entity.draw())
  }

}