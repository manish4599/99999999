
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Search, BookOpen, Book, FileText, Video, MessageSquare } from "lucide-react";

export default function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock frequently asked questions
  const faqs = [
    {
      question: "How do I add a new product?",
      answer: "You can add a new product by navigating to the Products page and clicking on the 'Add Product' button in the top right corner. Fill in the required information in the form and click 'Save' to create the product."
    },
    {
      question: "How can I manage user roles and permissions?",
      answer: "To manage user roles and permissions, go to the Settings page and select the 'Roles & Permissions' tab. Here you can define custom roles, assign permissions to each role, and manage user access levels."
    },
    {
      question: "How do I view my sales analytics?",
      answer: "Sales analytics can be found in the Analytics page. You can filter by date range and view various metrics including revenue, order volume, average order value, and conversion rates. Use the tabs to switch between different report views."
    },
    {
      question: "How can I process refunds for orders?",
      answer: "To process a refund, go to the Orders page, find the specific order, and click on it to view details. In the order details page, click the 'Process Refund' button. You can choose between full or partial refunds and add notes about the reason for the refund."
    },
    {
      question: "How do I customize notification templates?",
      answer: "To customize notification templates, navigate to the Notifications page and click on the 'Templates' tab. You'll see a list of all available templates. Click on any template to edit its content. You can use placeholders like {{user_name}} that will be replaced with actual data when the notification is sent."
    }
  ];
  
  // Documentation sections
  const documentationSections = [
    {
      title: "Getting Started Guide",
      description: "Learn the basics of navigating and using the admin panel",
      icon: <BookOpen className="h-5 w-5 text-blue-500" />,
    },
    {
      title: "User Management",
      description: "Managing user accounts, roles, and permissions",
      icon: <Book className="h-5 w-5 text-green-500" />,
    },
    {
      title: "Order Processing",
      description: "How to handle orders, refunds, and shipping",
      icon: <FileText className="h-5 w-5 text-purple-500" />,
    },
    {
      title: "Analytics & Reporting",
      description: "Understanding your data and creating reports",
      icon: <Video className="h-5 w-5 text-amber-500" />,
    },
    {
      title: "API Documentation",
      description: "Technical reference for the admin panel API",
      icon: <FileText className="h-5 w-5 text-gray-500" />,
    }
  ];
  
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Help Center</h1>
        <Button className="flex items-center gap-1">
          <MessageSquare className="h-4 w-4" />
          Contact Support
        </Button>
      </div>
      
      <Card>
        <CardContent className="pt-6">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h2 className="text-2xl font-bold mb-2">How can we help?</h2>
            <p className="text-gray-600">Search for answers or browse our documentation</p>
          </div>
          
          <div className="relative max-w-lg mx-auto mb-8">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input 
              placeholder="Search for help articles..." 
              className="pl-10 py-6 text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {documentationSections.map((section, index) => (
              <Card key={index} className="cursor-pointer hover:bg-gray-50 transition-colors">
                <CardContent className="p-4 flex">
                  <div className="mr-4 mt-1">{section.icon}</div>
                  <div>
                    <h3 className="font-medium">{section.title}</h3>
                    <p className="text-sm text-gray-500">{section.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="faq" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="faq">Frequently Asked Questions</TabsTrigger>
          <TabsTrigger value="videos">Video Tutorials</TabsTrigger>
        </TabsList>
        <TabsContent value="faq" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>
                Find quick answers to common questions about using the admin panel.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`faq-${index}`}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="videos" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Video Tutorials</CardTitle>
              <CardDescription>
                Learn how to use the admin panel with step-by-step video guides.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((_, index) => (
                  <div key={index} className="rounded-lg overflow-hidden border border-gray-200">
                    <div className="bg-gray-100 aspect-video flex items-center justify-center">
                      <Video className="h-12 w-12 text-gray-400" />
                    </div>
                    <div className="p-3">
                      <h3 className="font-medium mb-1">
                        {index === 0 && "Getting Started with the Dashboard"}
                        {index === 1 && "Managing Users and Permissions"}
                        {index === 2 && "Processing Orders and Shipments"}
                        {index === 3 && "Creating Custom Reports"}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {index === 0 && "3:45 mins • Beginner"}
                        {index === 1 && "5:12 mins • Intermediate"}
                        {index === 2 && "4:30 mins • Beginner"}
                        {index === 3 && "7:18 mins • Advanced"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
