export interface GameParams {
    id: string,
    title: string,
    bannerUrl: string
}

export declare global {
    namespace ReactNavigation {
        interface RootPramList {
            home: undefined;
            game: GameParams;
        }
    }
}