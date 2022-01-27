import {UnitState} from "../../../data/enums/unit-state.enum";
import {DoorState} from "../../../data/enums/door-state.enum";
import {UnitIndicatorType} from "../../../data/types/unit-indicator.type";
import {BadgeType} from "../../../data/types/badge.type";
import {
  ALARM_BADGE_ICON,
  DOOR_CLOSED_ICON,
  DOOR_OPEN_ICON,
  HUMIDITY_ICON,
  TEMP_HUMID_BADGE_ICON,
  TEMPERATURE_ICON,
  UNIT_ALARM_ICON,
  UNIT_LOCKED_ICON,
  UNIT_UNLOCKED_ICON
} from "../helpers/icons.helper";

export class UnitIndicatorFactory {
  /**
   * Get the icon for a unit's state
   * @param unitState - {UnitState}
   */
  static getUnitStateIcon(unitState: UnitState): string {
    switch (unitState) {
      case UnitState.ALARM:
        return UNIT_ALARM_ICON;
      case UnitState.LOCKED:
        return UNIT_LOCKED_ICON;
      case UnitState.UNLOCKED:
        return UNIT_UNLOCKED_ICON;
    }
  }

  /**
   * Get the color of the icon for a unit's state
   * @param unitState - {UnitState}
   */
  static getUnitStateColor(unitState: UnitState): string {
    switch (unitState) {
      case UnitState.ALARM:
        return 'red'
      case UnitState.LOCKED:
        return 'green'
      case UnitState.UNLOCKED:
        return 'blue'
    }
  }

  /**
   * Get the human-readable text for a unit's state
   * @param unitState - {UnitState}
   */
  static getUnitStateText(unitState: UnitState): string {
    switch (unitState) {
      case UnitState.ALARM:
        return 'Alarm'
      case UnitState.LOCKED:
        return 'Locked'
      case UnitState.UNLOCKED:
        return 'Unlocked'
    }
  }

  /**
   * Get the icon of the door's state of a unit
   * @param doorState - {DoorState}
   */
  static getDoorStateIcon(doorState: DoorState): string {
    switch (doorState) {
      case DoorState.CLOSED:
        return DOOR_CLOSED_ICON
      case DoorState.OPEN:
        return DOOR_OPEN_ICON
    }
  }

  /**
   * Get the human-readable text of the door's state of a unit
   * @param doorState - {DoorState}
   */
  static getDoorStateText(doorState: DoorState): string {
    switch (doorState) {
      case DoorState.CLOSED:
        return 'Closed'
      case DoorState.OPEN:
        return 'Open'
    }
  }

  /**
   * Get the icon color of a door's state of a unit
   * @param doorState - {DoorState}
   */
  static getDoorStateColor(doorState: DoorState): string {
    switch (doorState) {
      case DoorState.CLOSED:
        return 'red'
      case DoorState.OPEN:
        return 'green'
    }
  }

  /**
   *  Get the icon color of a unit's temperature reading
   * @param temperatureReading
   */
  static getTemperatureColor(temperatureReading: number): string {
    if (temperatureReading >= 90) {
      return 'red'
    } else if (temperatureReading <= 32) {
      return 'blue'
    }

    return 'green';
  }

  /**
   *  Get the icon color of a door's humidity reading
   * @param humidityReading
   */
  static getHumidityColor(humidityReading: number): string {
    if (humidityReading >= 90) {
      return 'red'
    }
    return 'green';
  }

  /**
   * Returns the UnitIndicatorType representation of the door state data
   * @param doorState
   */
  static getDoorStateData(doorState: DoorState): UnitIndicatorType {
    return {
      icon: this.getDoorStateIcon(doorState),
      text: this.getDoorStateText(doorState),
      iconColor: this.getDoorStateColor(doorState)
    };
  }

  /**
   * Returns the UnitIndicatorType representation of the state data
   * @param unitState
   */
  static getUnitStateData(unitState: UnitState): UnitIndicatorType {
    let badge: BadgeType | undefined;

    if (unitState === UnitState.ALARM) {
      badge = {
        icon: ALARM_BADGE_ICON,
        text: 'An alarm has been tripped'
      }
    }

    return {
      icon: this.getUnitStateIcon(unitState),
      text: this.getUnitStateText(unitState),
      iconColor: this.getUnitStateColor(unitState),
      badge
    };
  }

  /**
   * Returns the UnitIndicatorType representation of the temperature data
   * @param temperatureReading - Temperature in Celsius (number)
   */
  static getTemperatureData(temperatureReading: number): UnitIndicatorType {
    let badge: BadgeType | undefined;

    // TODO: Replace this with a call to the API for a threshold reading
    if (temperatureReading > 95) {
      badge = {
        icon: TEMP_HUMID_BADGE_ICON,
        text: 'The temperature is above the specified threshold'
      }
    } else if (temperatureReading < 31) {
      badge = {
        icon: TEMP_HUMID_BADGE_ICON,
        text: 'The temperature is below the specified threshold'
      }
    }

    const formattedReading = temperatureReading === -9999 ? '--' : `${temperatureReading} C`;

    return {
      icon: TEMPERATURE_ICON,
      text: formattedReading,
      iconColor: this.getTemperatureColor(temperatureReading),
      badge
    };
  }

  /**
   * Returns the UnitIndicatorType representation of humidity data
   * @param humidityReading - Humidity value in percent (number)
   */
  static getHumidityData(humidityReading: number): UnitIndicatorType {
    let badge: BadgeType | undefined;

    // TODO: Replace this with a call to the API for a threshold reading
    if (humidityReading > 95) {
      badge = {
        icon: HUMIDITY_ICON,
        text: 'The humidity level is above the specified threshold'
      }
    }

    const formattedReading = humidityReading === -9999 ? '--' : `${humidityReading}%`;

    return {
      icon: HUMIDITY_ICON,
      text: formattedReading,
      iconColor: this.getHumidityColor(humidityReading),
      badge
    };
  }
}
