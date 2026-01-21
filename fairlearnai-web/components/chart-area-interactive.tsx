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
  { date: "2024-04-01", focus: 75, quiz: 82 },
  { date: "2024-04-03", focus: 78, quiz: 80 },
  { date: "2024-04-05", focus: 82, quiz: 85 },
  { date: "2024-04-07", focus: 80, quiz: 83 },
  { date: "2024-04-09", focus: 85, quiz: 88 },
  { date: "2024-04-11", focus: 88, quiz: 86 },
  { date: "2024-04-13", focus: 92, quiz: 90 },
  { date: "2024-04-15", focus: 89, quiz: 92 },
  { date: "2024-04-17", focus: 95, quiz: 94 },
  { date: "2024-04-19", focus: 92, quiz: 93 },
  { date: "2024-04-21", focus: 98, quiz: 96 },
  { date: "2024-04-23", focus: 96, quiz: 95 },
  { date: "2024-04-25", focus: 102, quiz: 98 },
  { date: "2024-04-27", focus: 100, quiz: 97 },
  { date: "2024-04-29", focus: 105, quiz: 99 },
  { date: "2024-05-01", focus: 103, quiz: 100 },
  { date: "2024-05-03", focus: 108, quiz: 98 },
  { date: "2024-05-05", focus: 106, quiz: 96 },
  { date: "2024-05-07", focus: 112, quiz: 95 },
  { date: "2024-05-09", focus: 110, quiz: 94 },
  { date: "2024-05-11", focus: 115, quiz: 96 },
  { date: "2024-05-13", focus: 113, quiz: 95 },
  { date: "2024-05-15", focus: 118, quiz: 97 },
  { date: "2024-05-17", focus: 116, quiz: 98 },
  { date: "2024-05-19", focus: 122, quiz: 99 },
  { date: "2024-05-21", focus: 120, quiz: 98 },
  { date: "2024-05-23", focus: 125, quiz: 97 },
  { date: "2024-05-25", focus: 123, quiz: 96 },
  { date: "2024-05-27", focus: 128, quiz: 95 },
  { date: "2024-05-29", focus: 126, quiz: 96 },
  { date: "2024-05-31", focus: 132, quiz: 98 },
  { date: "2024-06-02", focus: 130, quiz: 99 },
  { date: "2024-06-04", focus: 135, quiz: 100 },
  { date: "2024-06-06", focus: 133, quiz: 99 },
  { date: "2024-06-08", focus: 138, quiz: 98 },
  { date: "2024-06-10", focus: 136, quiz: 97 },
  { date: "2024-06-12", focus: 142, quiz: 96 },
  { date: "2024-06-14", focus: 140, quiz: 95 },
  { date: "2024-06-16", focus: 145, quiz: 97 },
  { date: "2024-06-18", focus: 143, quiz: 98 },
  { date: "2024-06-20", focus: 148, quiz: 99 },
  { date: "2024-06-22", focus: 146, quiz: 100 },
  { date: "2024-06-24", focus: 152, quiz: 99 },
  { date: "2024-06-26", focus: 150, quiz: 98 },
  { date: "2024-06-28", focus: 155, quiz: 99 },
  { date: "2024-06-30", focus: 158, quiz: 100 },
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
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="blur" in2="SourceGraphic" operator="over" />
              </filter>
            </defs>
            <CartesianGrid vertical={false} stroke="#f8fafc" strokeDasharray="4 4" />
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
              type="natural"
              fill="url(#fillQuiz)"
              stroke="var(--color-quiz)"
              strokeWidth={3}
              stackId="a"
              style={{ filter: "drop-shadow(0 0 4px var(--color-quiz))" }}
              activeDot={{ r: 6, strokeWidth: 0, fill: "var(--color-quiz)" }}
            />
             <Area
              dataKey="focus"
              type="natural"
              fill="url(#fillFocus)"
              stroke="var(--color-focus)"
              strokeWidth={3}
              stackId="b"
              style={{ filter: "drop-shadow(0 0 4px var(--color-focus))" }}
              activeDot={{ r: 6, strokeWidth: 0, fill: "var(--color-focus)" }}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
