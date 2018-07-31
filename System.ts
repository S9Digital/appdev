import { DeviceEventEmitter } from 'react-native';
import { Store } from 'redux';

import * as NativeWakeLock from 'react-native-android-wakelock';
import * as NativeAccelerometer from 'react-native-android-accelerometer';

class ModuleSystem {
    private static _instance: System = new System();
    private _haveWakelock: boolean;
    private _screenOn: boolean;
    private _store: Store;

    constructor() {
        if (System._instance) {
            throw new Error('Instantiation failed: Use System.getInstance() instead of new.');
        }
        System._instance = this;
        this.accelerometerListener();
    }

    static getInstance = (): System => {
        if (!System._instance) {new System()}
        return System._instance;
    }

    getWakeLock = async (screenOn: boolean) => {
        if (this._haveWakelock) {
            return;
        }
        try {
            await NativeWakeLock.acquireWakeLock(screenOn);
        }
        catch (ex) {
            throw(new Error('Unable to get wakelock ' + ex.message));
        }
        this._haveWakelock = true;
        this._screenOn = screenOn;
    }

    releaseWakeLock = async () => {
        if (!this._haveWakelock) {
            return;
        }
        try {
            await NativeWakeLock.releaseWakeLock();
        }
        catch (ex) {
            throw (new Error('Unable to release wakelock ' + ex.message));
        }
        this._haveWakelock = false;
        this._screenOn = false;
    }

    accelerometerListener = () => {
        NativeAccelerometer.setThreshold(1.5);
        DeviceEventEmitter.addListener('accelerometerUpdate', (e) => {
            if (!this._screenOn) {
                this.getWakeLock(true);
                this.releaseWakeLock();
            }
        });
    }
}

export default { ModuleSystem };