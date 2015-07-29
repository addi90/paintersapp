///<reference path="../../../typings/tsd.d.ts"/>

module painter.interfaces {
    export interface IPainterService {
        loadAllPainters: () => angular.IPromise
    }
}