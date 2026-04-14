/**
 * A regular year. 
 * 
 * 365 days long.
 */
type Year = number;
/**
 * A leap year is a special year with an additional day added to February
 * making it 29 days long. 
 * 
 * A leap year is 366 days.
 * 
 * A year is a leap year if it is:
 * - Divisible by 4 AND
 * - Not divisible by 100 UNLESS also divisible by 400
 */
type LeapYear = number;
/**
 * - Number of leap years: 97
 * - Total days: 400×365 + 97 = 146,097 days
 * - This is a CONSTANT - no exceptions!
 * 
 * All leap year complexity is encapsulated
 * Every 400-year block is identical
 * You can safely remove whole 400-year blocks
 * 
 * ```py
 * # Remove complete 400-year cycles
 * cycles_400 = days // 146097  # Each cycle is identical
 * days %= 146097               # Now days is 0 to 146096
 * year = cycles_400 * 400 + 1  # Start year of current block
 * ```
 */
type N400YearCycle = number

/**
 * In 100 years (normal expectation):
 * - If every 4th year were leap: 100/4 = 25 leap years
 * - But century years (100, 200, 300) are NOT leap (except if divisible by 400)
 * - So actual leap years: 24
 * - Total days: 100×365 + 24 = 36,524 days
 * 
 * Special case cycles_100 == 4: This means we're exactly at 
 * the end of a 400-year cycle (Dec 31 of year 400, 800, etc.). 
 * The function handles this as a special case.
 */
type N100YearCycle = number;