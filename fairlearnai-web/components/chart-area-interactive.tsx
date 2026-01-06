"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import { useIsMobile } from "@/hooks/use-mobile"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

export const description = "An interactive area chart"

const chartData = [
  { date: "2024-04-01", focus: 45, quiz: 75 },
  { date: "2024-04-02", focus: 60, quiz: 80 },
  { date: "2024-04-03", focus: 30, quiz: 65 },
  { date: "2024-04-04", focus: 90, quiz: 85 },
  { date: "2024-04-05", focus: 50, quiz: 70 },
  { date: "2024-04-06", focus: 120, quiz: 95 },
  { date: "2024-04-07", focus: 80, quiz: 88 },
  { date: "2024-04-08", focus: 40, quiz: 60 },
  { date: "2024-04-09", focus: 75, quiz: 78 },
  { date: "2024-04-10", focus: 100, quiz: 92 },
  { date: "2024-04-11", focus: 65, quiz: 85 },
  { date: "2024-04-12", focus: 55, quiz: 72 },
  { date: "2024-04-13", focus: 110, quiz: 90 },
  { date: "2024-04-14", focus: 45, quiz: 68 },
  { date: "2024-04-15", focus: 70, quiz: 82 },
  { date: "2024-04-16", focus: 95, quiz: 88 },
  { date: "2024-04-17", focus: 60, quiz: 75 },
  { date: "2024-04-18", focus: 85, quiz: 84 },
  { date: "2024-04-19", focus: 105, quiz: 96 },
  { date: "2024-04-20", focus: 50, quiz: 70 },
  { date: "2024-04-21", focus: 75, quiz: 80 },
  { date: "2024-04-22", focus: 65, quiz: 78 },
  { date: "2024-04-23", focus: 90, quiz: 86 },
  { date: "2024-04-24", focus: 115, quiz: 94 },
  { date: "2024-04-25", focus: 55, quiz: 74 },
  { date: "2024-04-26", focus: 80, quiz: 82 },
  { date: "2024-04-27", focus: 70, quiz: 76 },
  { date: "2024-04-28", focus: 100, quiz: 88 },
  { date: "2024-04-29", focus: 60, quiz: 72 },
  { date: "2024-04-30", focus: 85, quiz: 84 },
    // Simplified specific recent data for demo smoothness
  { date: "2024-05-01", focus: 95, quiz: 89 },
  { date: "2024-05-02", focus: 50, quiz: 75 },
  { date: "2024-05-03", focus: 110, quiz: 92 },
  { date: "2024-05-04", focus: 75, quiz: 80 },
  { date: "2024-05-05", focus: 65, quiz: 78 },
  { date: "2024-05-06", focus: 90, quiz: 85 },
  { date: "2024-05-07", focus: 125, quiz: 96 },
  { date: "2024-05-08", focus: 55, quiz: 70 },
  { date: "2024-05-09", focus: 80, quiz: 84 },
  { date: "2024-05-10", focus: 70, quiz: 76 },
  { date: "2024-05-11", focus: 100, quiz: 88 },
  { date: "2024-05-12", focus: 60, quiz: 72 },
  { date: "2024-05-13", focus: 85, quiz: 82 },
  { date: "2024-05-14", focus: 45, quiz: 68 },
  { date: "2024-05-15", focus: 75, quiz: 80 },
  { date: "2024-05-16", focus: 95, quiz: 90 },
  { date: "2024-05-17", focus: 65, quiz: 78 },
  { date: "2024-05-18", focus: 85, quiz: 84 },
  { date: "2024-05-19", focus: 110, quiz: 92 },
  { date: "2024-05-20", focus: 55, quiz: 74 },
  { date: "2024-05-21", focus: 80, quiz: 82 },
  { date: "2024-05-22", focus: 70, quiz: 76 },
  { date: "2024-05-23", focus: 105, quiz: 90 },
  { date: "2024-05-24", focus: 60, quiz: 72 },
  { date: "2024-05-25", focus: 90, quiz: 85 },
  { date: "2024-05-26", focus: 120, quiz: 94 },
  { date: "2024-05-27", focus: 50, quiz: 70 },
  { date: "2024-05-28", focus: 75, quiz: 80 },
  { date: "2024-05-29", focus: 65, quiz: 78 },
  { date: "2024-05-30", focus: 95, quiz: 88 },
  { date: "2024-05-31", focus: 130, quiz: 98 },
  { date: "2024-06-01", focus: 85, quiz: 84 },
  { date: "2024-06-02", focus: 60, quiz: 75 },
  { date: "2024-06-03", focus: 100, quiz: 88 },
  { date: "2024-06-04", focus: 120, quiz: 95 },
  { date: "2024-06-05", focus: 70, quiz: 78 },
  { date: "2024-06-06", focus: 90, quiz: 85 },
  { date: "2024-06-07", focus: 110, quiz: 92 },
  { date: "2024-06-08", focus: 55, quiz: 72 },
  { date: "2024-06-09", focus: 80, quiz: 80 },
  { date: "2024-06-10", focus: 95, quiz: 86 },
  { date: "2024-06-11", focus: 45, quiz: 68 },
  { date: "2024-06-12", focus: 75, quiz: 79 },
  { date: "2024-06-13", focus: 105, quiz: 90 },
  { date: "2024-06-14", focus: 85, quiz: 84 },
  { date: "2024-06-15", focus: 65, quiz: 77 },
  { date: "2024-06-16", focus: 125, quiz: 96 },
  { date: "2024-06-17", focus: 90, quiz: 85 },
  { date: "2024-06-18", focus: 60, quiz: 74 },
  { date: "2024-06-19", focus: 80, quiz: 82 },
  { date: "2024-06-20", focus: 115, quiz: 94 },
  { date: "2024-06-21", focus: 50, quiz: 70 },
  { date: "2024-06-22", focus: 75, quiz: 78 },
  { date: "2024-06-23", focus: 100, quiz: 88 },
  { date: "2024-06-24", focus: 70, quiz: 76 },
  { date: "2024-06-25", focus: 95, quiz: 86 },
  { date: "2024-06-26", focus: 130, quiz: 98 },
  { date: "2024-06-27", focus: 65, quiz: 75 },
  { date: "2024-06-28", focus: 85, quiz: 82 },
  { date: "2024-06-29", focus: 110, quiz: 90 },
  { date: "2024-06-30", focus: 140, quiz: 100 },
]

const chartConfig = {
  performance: {
    label: "Performance",
  },
  focus: {
    label: "Focus Time (min)",
    color: "#10b981", // Emerald 500
  },
  quiz: {
    label: "Quiz Score (%)",
    color: "#6366f1", // Indigo 500
  },
} satisfies ChartConfig

export function ChartAreaInteractive() {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState("90d")

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d")
    }
  }, [isMobile])

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date("2024-06-30")
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  return (
    <Card className="shadow-none border-0 h-full w-full bg-transparent">
        <div className="flex items-center justify-between mb-4">
            <div>
                 <CardTitle className="text-lg font-bold text-slate-800">Study Performance</CardTitle>
                <CardDescription className="text-slate-500 font-medium">
                    Focus Time vs. Quiz Score
                </CardDescription>
            </div>
             <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger
                  className="w-[140px] rounded-lg bg-slate-50 border-slate-200 text-slate-600 font-medium focus:ring-emerald-500/20"
                  aria-label="Select a value"
                >
                  <SelectValue placeholder="Last 3 months" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-slate-100 font-medium">
                  <SelectItem value="90d" className="rounded-lg">
                    Last 3 months
                  </SelectItem>
                  <SelectItem value="30d" className="rounded-lg">
                    Last 30 days
                  </SelectItem>
                  <SelectItem value="7d" className="rounded-lg">
                    Last 7 days
                  </SelectItem>
                </SelectContent>
              </Select>
        </div>

      <CardContent className="px-0 pt-0 pb-0 w-full h-[250px]">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-full w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillFocus" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-focus)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-focus)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillQuiz" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-quiz)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-quiz)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="#f1f5f9" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
              className="text-xs font-medium text-slate-400"
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                  className="rounded-xl bg-white border-slate-100 shadow-xl font-medium"
                />
              }
            />
            <Area
              dataKey="quiz"
              type="monotone"
              fill="url(#fillQuiz)"
              stroke="var(--color-quiz)"
              strokeWidth={2}
            />
             <Area
              dataKey="focus"
              type="monotone"
              fill="url(#fillFocus)"
              stroke="var(--color-focus)"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
