export class DetailDto {
    readonly roomId: number;
    readonly requestTime: Date[];
    readonly requestDuration: number[];
    readonly windSpeed: number[];
    readonly feeRate: number[];
    readonly fee: number[];
    readonly totalFee: number;
}
