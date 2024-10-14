import { BankFixedDepositDetails } from "./bankfixeddepositdetails"
import { BankMutualFundsDetails } from "./bankmutualfundsdetails"
import { BankRecurringDepositDetails } from "./bankrecurringdepositdetails"
import { BankSavingDetails } from "./banksavingdetails"

export class BankAccountDetails{
    AccountId: number
    BankId: number
    BankName: string
    IsNationalisedBank: boolean
    AccountTypeId: number
    AccountType: string
    AccountName: string
    BankSavingDetails: BankSavingDetails
    BankFixedDepositDetails: BankFixedDepositDetails
    BankRecurringDepositDetails: BankRecurringDepositDetails
    BankMutualFundsDetails: BankMutualFundsDetails[]
}