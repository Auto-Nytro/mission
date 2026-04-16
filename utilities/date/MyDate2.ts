/**
 * A year is normally 365 days long. 
 * 
 * A year consists of 12 months: [Insert month names]
 * 
 * Repeat per month: [Insert month name]: [Insert month days]
 * 
 * Some years are "leap", meaning they are one day longer than usual.
 * That day is added to January making it [Insert number] days long 
 * instead of [Insert number].
 * 
 * A year is identified by number. Year numbers start at 1: 1 is the 1st year
 * in the calendar.
 * 
 * An ordinal is a number identifying the day since the start of the calendar.
 * 
 * Ordinals start at 1: January 1 of year 1 is the 1st day in the calendar.
 * 
 * The calendar consists of 400-year cycles.
 * 
 * # 400-year cycle
 * Consists of four 100-year cycles.
 * 
 * Consists of 400 years, of which, 303 are non-leap while 97 are leap.
 * 
 * Consists of 146,097 days.
 * 
 * The number of positions of leap years are the same in each 400-year cycle.
 * 
 * Leap years: 
 *   4, 8, 12, .., 88, 92, 96 but NOT 100
 *   104, 108, 112, .., 188, 192, 196 but NOT 200
 *   204, 208, 212, .., 288, 292, 296 but NOT 300
 *   304, 308, 312, .., 388, 392, 396 AND 400
 *   
 * # 100-year cycles (centuries)
 * Consists of 25 4-year cycles.
 * 
 * Consists of 100 years.
 * 
 * A Common Century is one whose last year is no leap.
 * 
 * A Quadricentennial Century is one whose last year is leap.
 * 
 * A leap century is one whose last year is leap:
 * - 1..100: Common
 * - 100..200: Common
 * - 200..300: Common
 * - 300..400: Leap
 * 
 * 
 * A 4-year cycle constsist of 4 years. 
 * 
 * 
 */
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